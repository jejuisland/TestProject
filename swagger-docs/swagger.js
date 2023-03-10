/**
 * @swagger
 * tags:
 *   name: Subscriber
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscriber:
 *       type: object
 *       properties:
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the subscriber
 *         username:
 *           type: string
 *           description: The username of the subscriber
 *         password:
 *           type: string
 *           description: The password of the subscriber
 *         domain:
 *           type: string
 *           description: The domain of the subscriber on the IMS platform
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *           description: The status of the subscriber
 *         features:
 *           type: object
 *           properties:
 *             callForwardNoReply:
 *               type: object
 *               properties:
 *                 provisioned:
 *                   type: boolean
 *                   description: Whether call forwarding on no reply is provisioned
 *                 destination:
 *                   type: string
 *                   description: The destination number for call forwarding on no reply
 */

/**
 * @swagger
 * /ims/subscriber/{phoneNumber}:
 *   get:
 *     summary: Retrieve a subscriber by phone number
 *     tags: [Subscriber]
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         required: true
 *         description: The phone number of the subscriber to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested subscriber object
 *       404:
 *         description: Subscriber not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /ims/subscriber:
 *   post:
 *     summary: Create a new subscriber
 *     tags: [Subscriber]
 *     description: Creates a new subscriber with the provided subscriber details
 *     requestBody:
 *       description: Subscriber object that needs to be added to the system
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscriber'
 *     responses:
 *       '201':
 *         description: Subscriber created successfully
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /ims/subscriber/{phoneNumber}:
 *   put:
 *     summary: Update a subscriber by phone number
 *     tags: [Subscriber]
 *     description: Updates an existing subscriber identified by the provided phone number with the new subscriber details
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Phone number of the subscriber to update
 *     requestBody:
 *       description: Updated subscriber object with new values
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscriber'
 *     responses:
 *       '200':
 *         description: Subscriber updated successfully
 *       '400':
 *         description: Invalid request body or phone number parameter
 *       '404':
 *         description: Subscriber not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 *
 * /ims/subscriber/{phoneNumber}:
 *   delete:
 *     summary: Remove a subscriber identified by the provided phone number
 *     tags: [Subscriber]
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The phone number of the subscriber to remove
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Subscriber not found
 *       500:
 *         description: Internal server error
 */