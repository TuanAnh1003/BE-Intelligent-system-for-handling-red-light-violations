import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { User } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const { username, password } = req.body;
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      id: id,
      username: username,
      password: hashedPassword,
    };

    const user = await User.create(newUserData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(errorHelper('00001', req, error.message));
  }
};

/**
 * @swagger
 * /user:
 *    post:
 *      summary: Create a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The username of the user.
 *                email:
 *                  type: string
 *                  format: email
 *                  description: The email address of the user.
 *                password:
 *                  type: string
 *                  format: password
 *                  description: The password for the user account.
 *              required:
 *                - username
 *                - email
 *                - password
 *      tags:
 *        - User
 *      responses:
 *        "201":
 *          description: User created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */