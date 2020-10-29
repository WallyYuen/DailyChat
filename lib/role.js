import { userDb } from "lib/firebase";

export const roles = {
  admin: "admin",
  instructor: "instructor",
  actor: "actor",
  student: "student",
};

// TODO: role and role options should be moved to "getStaticProps"
// in _app but is not supported yet in the current version (9.5.5)
export const getUserRole = async (user) => {
  if (!user) return undefined;
  
  const fetchRoleOptions = await userDb
    .ref("roleOptions")
    .once("value")
    .catch((error) => {
      throw new Error(`Failed to fetch role options, ${error}`);
    });;

  const fetchRoles = await userDb
    .ref("roles")
    .once("value")
    .catch((error) => {
      throw new Error(`Failed to fetch user roles, ${error}`);
    });

  return Promise.allSettled([fetchRoleOptions, fetchRoles]).then((results) => {
    const [roleOptions, roles] = results.map(result => result.value.exportVal());

    const userRoleId = roles[user.uid]?.roleId;
    const userRole = roleOptions[userRoleId]?.role;

    return userRole;
  });
};
