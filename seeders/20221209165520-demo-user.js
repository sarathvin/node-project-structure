'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'admin',
      lastName: '',
      email: 'admin@example.com',
      password: '$2b$10$gLOum6xm7xxNJvo48PkSv.qt/DjHjbi.GUzd.JU6uXchHHkOCZEYm',
      phone: '',
      role_id: 0,
      address: '',
      state: 'Tamilnadu',
      city: 'chennai',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
