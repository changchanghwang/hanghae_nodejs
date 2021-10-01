module.exports = {
    isEmail: (value) => {
        const [localPart, domain, ...etc] = value.split('@');
        const localregExp = /^[a-zA-Z0-9+_-]+$/g;
        const domainregExp = /^[a-zA-Z0-9.-]+$/g;
        const localVal = localregExp.test(localPart);
        console.log(localVal);
        const domainVal = domainregExp.test(domain);
        // value가 이메일 형식에 맞으면 true, 형식에 맞지 않으면 false를 return 하도록 구현해보세요
        if (!localPart || !domain || etc.length >= 1) {
            return false;
        } else if (value.includes(' ')) {
            return false;
        } else if (value[0] === '-') {
            return false;
        } else if (!localVal) {
            return false;
        } else if (!domainVal) {
            return false;
        }

        console.log(localPart);

        return true;
    },
};