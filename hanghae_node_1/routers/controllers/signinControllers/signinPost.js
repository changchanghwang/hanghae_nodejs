exprts.signinPost = async (req, res, next) => {
    const { id, pw } = req.body;
    try {
        let isExist = await users.find({ id, pw });
        if (isExist.length) {
            let accessToken = tokenController.generateAccessToken(id);
            await res.cookie('login_token', accessToken, {
                maxAge: 50 * 60 * 1000,
                httpOnly: true,
            });
            res.send({ result: 'success' });
        } else {
            res.send({ result: 'Fail' });
        }
    } catch (err) {
        next(err);
    }
};

//특정 기능에 대해서 문서처럼 볼 수 있어야됨.
//reduce , snapshot
//bdd
//엘라스틱 스택
//프로미스올, 프로미스레이스
//아마존에서 관계형 쓰는 경우 RDS 추천 (대신 비쌈)
//npm boom 에러메세지