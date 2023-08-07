import User from "../models/User.js";

export const getUser = async (req,res) => {
    try{

        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);

    } catch(err) {
        res.status(404).json({message : err.message});
    }
};

export const getUserFriends = async (req,res) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location , picturePath}) => {
                return {_id, firstName , lastName , occupation , location , picturePath };
            }
        );
        res.status(200).json(formattedFriends);

    } catch(err) {
        res.status(404).json({message : err.message});
    }
};

export const addRemoveFriends = async (req,res) => {
    try{

        const { userId , friendId } = req.params;
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== userId);
        } else {
            user.friends.push(friendId);
            friend.friends.push(userId);
        }
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
          );
          const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );
      
          res.status(200).json(formattedFriends);

    } catch(err) {
        res.status(404).json({message : err.message});
    }
};