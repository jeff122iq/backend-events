/**
 * @swagger
 * components:
 *   schemas:
 *     Sign_Up:
 *       type: multipart/form-data
 *       required:
 *         - pictures
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - dob
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         pictures:
 *           type: file
 *           description: The user title
 *         firstname:
 *           type: string
 *           description: The user first name
 *         lastname:
 *           type: string
 *           description: The user last name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         dob:
 *           type: string
 *           description: The user day of birth
 *       example:
 *             user:
 *               firstname: Jane
 *               lastname: Dow
 *               email: jane@ciller.com
 *               dob: 2001-02-12T00:00:00.000Z
 *               pictures: /public/268b988b-24af-41bd-82ef-fe419cb2647d.txt
 *               password: $2b$10$W84EYMEk50j0.ZtJ8s27Z.PjmVSI.z0rZL6Eyb3cRZEngeQ0NK8/2
 *               _id: 61a2bb1843de5c839ef560d3
 *             message: add user
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The users managing API
  */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register to Platform
 *     tags: [Sign Up]
 *     responses:
 *       '201':
 *         description: Register to Platform
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Sign_Up'
 */