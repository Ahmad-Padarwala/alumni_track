const connection = require("../../db/Connection");

//add following user data

const addUserFollowPost = async (req, res) => {
    const self_user_id = req.params.id;
    const req_user_id = req.params.reqid;
    const sql =
        "INSERT INTO user_follower (self_user_id,req_user_id) VALUES (?,?)";
    const data = [
        self_user_id,
        req_user_id,
    ];
    connection.query(sql, data, (err, result) => {
        if (err) {
            console.error("Error adding record:", err);
            res.status(500).json({ error: "Error adding record" });
        } else {
            res.sendStatus(200);
        }
    });
};

//check user following status data

// const getUserCheckFollowingStatus = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const otherUserId = req.params.otherUserId;

//         const follows = await Follows.findOne({ follower: userId, following: otherUserId });

//         res.json({ isFollowing: !!follows });
//     }
//     catch (error) {
//         console.error('Error checking following status:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

//get user follow lenght

const getUserFollowLenght = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM user_follower WHERE self_user_id=?`;
    const data = [id];
    connection.query(sql, data, (error, result) => {
        if (error) {
            console.log(
                "Error Getting Data from user_follower Table in server.js" + error
            );
        } else {
            res.status(200).json(result);
        }
    });
}

module.exports = {
    addUserFollowPost,
    getUserFollowLenght,
    // getUserCheckFollowingStatus,
};
