import User from "../Models/User";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(200).json({ success: true, body: user });
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friend = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formatedFriends = friend.map(
            ({ id, firstName, lastName, occupation, location, picturePath }) => {
                return { id, firstName, lastName, occupation, location, picturePath };
            }
        )

        res.status(200).json({ success: true, body: formatedFriends });
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = user.friends.filter((id) => id !== id);
        } else {
            user.friends.push(id);
            user.friends.push(friends);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formatedFriends = friend.map(
            ({ id, firstName, lastName, occupation, location, picturePath }) => {
                return { id, firstName, lastName, occupation, location, picturePath };
            }
        )

        res.status(200).json({ success: true, body: formatedFriends });
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}
