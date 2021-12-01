
describe('/user/signup', ()=>{
    const signup = 'http://localhost:5000/api/user/signup'
    
    it('returns 400 when with no body',()=>{
        cy.request({
            method : 'POST',
            url : signup,
            failOnStatusCode : false
        }).then((response) =>{
            expect(response.status).to.eq(400);
        })
    })
})