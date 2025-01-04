const Users = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return <h1 className="title">Users</h1>;
};

export default Users;
