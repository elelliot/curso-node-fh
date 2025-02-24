interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

//callback ahora es un tipo de dato. Es una funcion que recibe un error(opcional) y un usuario(opcional)
export function getUserById(id: number, callback: (err?: string, user?: User)=> void) {
  const user = users.find(function (user) {
    return user.id === id;
  });

  if (!user) {
    return callback(`USUARIO no encontrado ${id}`);
  }

  return callback( undefined , user); //Si encuentra user, retorna undefined(osea sin error) y el usuario
}

// module.exports = {
//   getUserById,
// };
