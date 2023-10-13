import { Vehicle } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const cameraId = req.params.cameraId;
    const updatedVehicleData = req.body;
    const camera = await Vehicle.findByPk(cameraId);

    if (!camera) {
      res.status(404).json(errorHelper('00002', req, 'Vehicle not found'));
    } else {
      await camera.update(updatedVehicleData);
      res.json(camera);
    }
  } catch (error) {
    res.status(500).json(errorHelper('00004', req, error.message));
  }
};

/**
 * @swagger
 * /cameras/{cameraId}:
 *   put:
 *     summary: Update a camera by ID
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: cameraId
 *         required: true
 *         description: ID of the camera
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Vehicle updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */