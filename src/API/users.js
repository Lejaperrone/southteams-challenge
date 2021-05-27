export const getUsers = async (quantity) => {
  const response = await fetch(
    `https://randomuser.me/api/?results=${quantity}&&inc=name,location,email,cell,picture`
  );
  const jsonResponse = await response.json();
  return jsonResponse.results.map((apiUser) => formatUser(apiUser));
};

const formatUser = (apiUser) => {
  return {
    name: `${apiUser.name.first} ${apiUser.name.last}`,
    cell: apiUser.cell,
    image: apiUser.picture.large,
    email: apiUser.email,
    location: `${apiUser.location.city}, ${apiUser.location.state}`
  };
};
