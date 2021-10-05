const { authTokenForRender, authTokenForSend } = require('./loginAuth');
const jwt = require('jsonwebtoken');

test('랜더링라우터에서 로그인이 되어있지않으면 alert와 로그인페이지로 이동스크립트를 보내준다.', () => {
    const req = {
        cookies: {
            login_token: undefined,
        },
    };
    const res = {
        writeHead: jest.fn(),
        write: jest.fn(),
    };
    const next = jest.fn();
    authTokenForRender(req, res, next);
    expect(res.write).toBeCalledWith(
        "<script>alert('로그인 해주세요.'); window.location.href='/user/signin'</script>"
    );
});

test('랜더링 라우터에서 로그인이 되어있으면 jwt를 verify하고 next를 호출한다.',()=>{
    const req = {
        cookies: {
            login_token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2MzM0MDA1NTcsImV4cCI6MTYzMzQwMzU1N30.YslrhORKmqXF5iHnXtw7nAtBwPHRsxGlgPSUN1gC7_pmXPkzO5F9MAV_IEFMMylXPlzAXwgPCo117IM6QC7CrQ',
        },
    };
    const res = {
        writeHead: jest.fn(),
        write: jest.fn(),
    };
    const next = jest.fn();
    authTokenForRender(req,res,next);
    expect(next).toBeCalledTimes(1);
})