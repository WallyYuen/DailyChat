import React from "react";
import { types } from "mobx-state-tree";
import UserModel from "../models/userModel";

export const ApplicationStore = types
  .model("ApplicationStore", {
    user: types.maybe(UserModel),
    isLoading: true,
  })
  .views(self => ({
    get isAuthenticated() {
      return !!self.user;
    },
  }))
  .actions(self => ({
    setLoading: isLoading => self.isLoading = isLoading,
    setUser(user) {
      if (!user) {
        self.user = undefined;
        return;
      }

      self.user = UserModel.create({ ...user });
    },
  }));

export const ApplicationContext = React.createContext(null);
