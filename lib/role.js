import { userDb } from "lib/firebase";

export const roles = {
  admin: "admin",
  instructor: "instructor",
  actor: "actor",
  student: "student",
};

const fetchRoleOptions = async () => await userDb
  .ref("roleOptions")
  .once("value")
  .catch((error) => {
    throw new Error(`Failed to fetch role options, ${error}`);
  });;

const fetchRoles = async () => await userDb
  .ref("roles")
  .once("value")
  .catch((error) => {
    throw new Error(`Failed to fetch user roles, ${error}`);
  });

// TODO: Role and role options should be moved to "getStaticProps"
// in _app but is not supported yet in the current version (9.5.5)
export const getUserRole = async (user) => {
  if (!user) return undefined;

  return Promise.allSettled([fetchRoleOptions(), fetchRoles()]).then((results) => {
    const [roleOptions, dbRoles] = results.map(result => result.value.exportVal());

    if (!roleOptions) return undefined;
    if (!dbRoles) return roles.student;

    const roleId = Object.values(dbRoles).find(value => value.email === user.email)?.roleId;
    const userRole = roleOptions[roleId]?.role;

    return userRole;
  });
};

export const addRoleAndOptions = async (role, emails) => {
  const userMails = emails.split(",").map(email => email.trim());

  if (!role || !userMails) return;

  fetchRoleOptions().then((result) => {
    const roleValues = Object.values(roles);
    const values = result.exportVal() ?? {};

    const options = Object.values(values).map(value => value.role);
    const filteredOptions = roleValues
      .filter(option => !options.includes(option));
  
    const addOptions = filteredOptions.map((role) => userDb.ref("roleOptions")
      .push()
      .set({ role })
      .catch((error) => {
        throw new Error(`Failed to add role: ${role}, ${error}`);
      }));

    Promise.allSettled(addOptions).then(() => {
      fetchRoleOptions().then((optionsResult) => {
        const dbOptions = optionsResult.exportVal() ?? {};

        userMails.forEach((email) => {
          fetchRoles().then((rolesResult) => {
            const dbRoles = rolesResult.exportVal() ?? {};
            const roleKey = Object.keys(dbRoles).find(key => dbRoles[key]?.email === email);
  
            const roleId = Object.keys(dbOptions).find(key => dbOptions[key].role === role);
            const roleInfo = { roleId, email };
        
            if (!roleKey) {
              userDb.ref("roles")
                .push()
                .set(roleInfo)
                .catch((error) => {
                  throw new Error(`Failed to add ${role}, ${error}`);
                });
            } else {
              userDb.ref(`roles/${roleKey}`)
                .update(roleInfo)
                .catch(error => {
                  throw new Error(`Failed to update mail for ${role}, ${error}`);
                });
            }
          });
        });
      });
    });
  });
};

export const addActors = async () => {
  const actors = [
    {
      displayName: "Sjaak",
      approved: true,
      email: "sjaak@unknown.com",
      isOnline: true,
      role: roles.actor,
    },
    {
      displayName: "Johan de Vries",
      approved: true,
      email: "johan.devries@unknown.com",
      isOnline: true,
      role: roles.actor,
    },
    {
      displayName: "Maria",
      approved: true,
      email: "maria@unknown.com",
      isOnline: true,
      role: roles.actor,
    },
  ];

  addRoleAndOptions(roles.actor, actors.map(actor => actor.email).join(","));

  const dbUsers = await userDb
    .ref("users")
    .once("value")
    .catch((error) => {
      throw new Error(`Failed to fetch users, ${error}`);
    });

  const users = Object.values(dbUsers.exportVal() ?? {});

  const actorsToAdd = actors
    .filter(actor => !users.some(user => user.email === actor.email));

  actorsToAdd.forEach((actor) => userDb
    .ref("users")
    .push()
    .set(actor)
    .catch((error) => {
      throw new Error(`Failed to add actors, ${error}`);
    }));
};
