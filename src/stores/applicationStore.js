import React from "react";
import { types } from "mobx-state-tree";
import UserModel from "../models/userModel";

export const ApplicationStore = types
  .model("ApplicationStore", {
    currentUser: types.maybe(types.reference(UserModel)),
    users: types.array(UserModel),
    isLoading: true,
  })
  .actions(self => ({
    setLoading: isLoading => self.isLoading = isLoading,
    setUsers(users) {
      const uniqueUsers = {};

      [...self.users, ...users].forEach((user) => {
        uniqueUsers[user.email] = { ...user };
      });

      self.users = Object.values(uniqueUsers);
    },
    setUser(user) {
      const currentUser = user ? { ...user } : undefined;

      self.currentUser = user?.uid;
      if (currentUser) self.setUsers([currentUser]);
    },
  }))
  .views(self => ({
    get isAuthenticated() {
      return !!self.currentUser;
    },
    get userList() {
      return self.users.filter(user => user.email !== self.currentUser.email);
    },
    get onlineUsers() {
      return self.users.filter(user => user.isOnline);
    },
  }));

export const ApplicationContext = React.createContext(null);
