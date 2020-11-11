import React, { useContext } from "react";
import { types } from "mobx-state-tree";
import { roles } from "lib/role";
import { moods, getMoodKey } from "lib/mood";

// Models
import UserModel from "models/userModel";
import MessageModel from "models/messageModel";
import CatalogStore from "stores/catalogStore";
import SettingStore from "stores/settingStore";

export const ApplicationStore = types
  .model("ApplicationStore", {
    users: types.array(UserModel),
    currentUser: types.safeReference(UserModel),
    userAsActor: types.safeReference(UserModel),
    isLoading: true,
    messages: types.array(MessageModel),
    focusedUser: types.safeReference(UserModel),
    catalog: types.optional(CatalogStore, {}),
    setting: types.optional(SettingStore, {}),
  })
  .actions(self => ({
    setLoading: isLoading => self.isLoading = isLoading,
    setUsers(users) {
      const uniqueUsers = {};

      [...users, ...self.users].forEach((user) => {
        uniqueUsers[user.email] = { ...user };
      });

      users.forEach((user) => {
        const displayName = uniqueUsers[user.email].displayName
        const moodKey = getMoodKey(user.mood);
        const mood = moods[moodKey] ?? moods.default;

        // Keep the saved properties
        uniqueUsers[user.email].mood = mood;
        uniqueUsers[user.email].displayName = displayName ?? user.displayName;
        
        uniqueUsers[user.email].isOnline = user.isOnline;
        uniqueUsers[user.email].approved = user.approved;
      });

      self.users = Object.values(uniqueUsers);
    },
    setUser(user) {
      const currentUser = user ? { ...user } : undefined;

      self.currentUser = user?.uid;
      if (currentUser) self.setUsers([currentUser]);
    },
    setUserAsActor(user) {
      self.userAsActor = user?.uid;
    },
    setFocusedUser(user) {
      self.focusedUser = user?.uid;
    },
    setMessages(messages) {
      self.messages = messages.map((message) => ({ userId: message.uid, ...message }));
    },
  }))
  .views(self => ({
    get sortedMessages() {
      const sortedMessages = [];

      self.messages.forEach((message) => {
        const sortedMessage = sortedMessages[sortedMessages.length - 1];

        if (sortedMessage?.uid === message.uid) {
          sortedMessage.messages.push(message);
        } else {
          sortedMessages.push({ uid: message.uid, messages: [message] });
        }
      });

      return sortedMessages;
    },
    get isAuthenticated() {
      return !!self.currentUser;
    },
    get userList() {
      return self.users
        .filter(user => user.email !== self.currentUser?.email)
        .sort((a, b) => a.name - b.name);
    },
    get actors() {
      return self.users
        .filter(user => user.role === roles.actor)
        .sort((a, b) => a.name - b.name);
    },
    get onlineUsers() {
      return self.userList.filter(user => user.isOnline)
        .filter(user => user.isContact);
    },
    get activeUser() {
      return self.userAsActor ?? self.currentUser;
    },
    get lobbyUsers() {
      return self.userList.filter(user => user.isOnline)
        .filter(user => user.role === roles.student && !user.approved);
    },
    get mentions() {
      return self.userList.map((user) => ({
        id: user.uid,
        display: user.name,
      }));
    },
  }));

export const ApplicationContext = React.createContext(null);

export const useApplicationStore = () => useContext(ApplicationContext);
