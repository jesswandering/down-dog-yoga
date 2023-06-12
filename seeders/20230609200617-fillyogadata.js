'use strict';
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await axios.get(`https://yoga-api-nzy4.onrender.com/v1/poses`)
      .then(async response => {
        const poses = response.data.map(p => {
          return {
            name: p.english_name,
            //description: p.pose_description,
            //level: p.difficulty_level,
            img: p.url_png,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        })

        await queryInterface.bulkInsert('poses', poses, {})
      })
      .catch(err => console.log('Error', err))
  },
};