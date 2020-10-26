import React, { useContext } from "react";
import { types } from "mobx-state-tree";

// Models
import UserModel from "models/userModel";

export const ApplicationStore = types
  .model("ApplicationStore", {
    users: types.array(UserModel),
    currentUser: types.maybe(types.reference(UserModel)),
    userAsActor: types.maybe(types.reference(UserModel)),
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
    setUserAsActor(user) {
      const userAsActor = user ? { ...user } : undefined;

      self.userAsActor = user?.uid;
      if (userAsActor) self.setUsers([userAsActor]);
    },
  }))
  .views(self => ({
    get isAuthenticated() {
      return !!self.currentUser;
    },
    get userList() {
      return self.users
        .filter(user => user.email !== self.currentUser.email)
        .sort((a, b) => a.name - b.name);
    },
    get actors() {
      return self.users
        .filter(user => user.role === "actor")
        .sort((a, b) => a.name - b.name);
    },
    get onlineUsers() {
      return self.userList.filter(user => user.isOnline)
        .filter(user => user.role !== "actor");
    },
    get activeUser() {
      return self.userAsActor ?? self.currentUser;
    },
  }));

export const ApplicationContext = React.createContext(null);

export const useApplicationStore = () => useContext(ApplicationContext);
