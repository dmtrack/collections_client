const getRandomAvatar = () => {
    const avatar = `https://avatars.dicebear.com/api/avataaars/${(
        Math.random() + 1
    )
        .toString(36)
        .substring(7)}.svg`;
    return avatar;
};

export default getRandomAvatar;
