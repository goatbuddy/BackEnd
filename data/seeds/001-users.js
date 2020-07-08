exports.seed = function(knex, Promise) {
    return knex("users").insert([
      {
        id: 1,
        username: "niceguy",
        password: "$2a$10$BeUlzgN.uJacLsBNQIfyv.ED7FyFAaT0IRQSDMzW8LB7Us0qJAfUS", //password
        name: "Mr. Nice Guy",
        phone: "1234567890",
        email: "test@email.com",
        address: "123 Nice Drive",
    },
    {
      id: 2,
      username: "nicegal",
      password: "$2a$10$BeUlzgN.uJacLsBNQIfyv.ED7FyFAaT0IRQSDMzW8LB7Us0qJAfUS", //password
      name: "Mr. Nice Gal",
      phone: "1234567890",
      email: "test@email.com",
      address: "123 Nice Drive",
  },
  {
    id: 3,
    username: "niceperson",
    password: "$2a$10$BeUlzgN.uJacLsBNQIfyv.ED7FyFAaT0IRQSDMzW8LB7Us0qJAfUS", //password
    name: "Mr. Nice Person",
    phone: "1234567890",
    email: "test@email.com",
    address: "123 Nice Drive",
  },
    ]);
  };