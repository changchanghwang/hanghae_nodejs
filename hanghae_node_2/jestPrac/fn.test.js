const fn = require('./fn');

test('num1 과 num2를 입력하면 더해준다.',()=>{
    expect(fn.add(2,3)).toBe(5)
})
test('num1 과 num2를 입력하면 더해준다.',()=>{
    expect(fn.add(2,3)).toEqual(5)
})

test('3+3 != 5',()=>{
    expect(fn.add(3, 3)).not.toBe(5);
})

// test('이름과 나이를 전달받아서 객체를 반환',()=>{
//     expect(fn.makeUser('mike',30)).toBe({
//         name: 'mike',
//         age:30
//     })
// })

test('이름과 나이를 전달받아서 객체를 반환',()=>{
    expect(fn.makeUser('mike',30)).toEqual({
        name: 'mike',
        age:30
    })
})
// test('이름과 나이를 전달받아서 객체를 반환',()=>{
//     expect(fn.makeUser('mike',30)).toStrictEqual({
//         name: 'mike',
//         age:30
//     })
// }) 
//strictequal은 내용요소가 아예 똑같아야함.

//toBeNull
//toBeUndefined
//toBeDefined
//toBeTruthy
//toBeFalsy

//toBeGreaterThan 크다
//tobeGreaterThanOrEqual 크거나같다
//tobeLessThan 작다.
//toBeLessThanOrEqual 작거나 같다 
//toBeCloseTo 소수점 계산할때

//정규표현식
test("Hello World 에 a라는 글자가 있나?", ()=>{
    expect('Hello World').toMatch(/h/i);
})

//toContain 

test('유저리스트에 mike가 있나?',()=>{
    const user = 'mike';
    const userList = ['mike','jane','kai'];
    expect(userList).toContain(user)
})

test('이거 에러나나요?',()=>{
    expect(()=> fn.throwErr()).toThrow('xx');
})

test('3초후에 받아온 이름은 mike', ()=>{
    function callback(name){
        expect(name).toBe('mike');
    }
    fn.getName(callback)
})