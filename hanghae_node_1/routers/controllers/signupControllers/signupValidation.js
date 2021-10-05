module.exports = {
    idAuth(id) {
        const idRegexp = /^[a-zA-Z0-9]{3,}$/;
        const validatedId = idRegexp.test(id);
        if (!validatedId) {
            // console.log('아이디 형식에 맞춰주세요');
            return false;
        }
        return true;
    },
    pwAuth(id, pw, pwCheck) {
        const pwRegexp = /^[a-zA-Z0-9]{4,}$/;
        const validatedPw = pwRegexp.test(pw);
        if (!validatedPw) {
            // console.log('패스워드 형식에 맞춰주세요');
            return false;
        } else if (pw !== pwCheck) {
            // console.log('패스워드 일치시켜주세요');
            return false;
        } else if (pw.search(id) !== -1) {
            // console.log('아이디와 중복되는 패스워드 설정하지 말아주세요');
            return false;
        }
        return true;
    },
};