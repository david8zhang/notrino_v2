/**
 * Created by david_000 on 4/20/2016.
 */
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:8900/api/v1");

describe("User unit tests", function() {

    var username = '';
    var password = '';
    var email = '';
    var user_id = '';
    var auth_token = '';

    /* Create a backdoor route to test user index routes. */
    before(function(done) {
        /* Create a test user to test index routes */
        server
            .post('/users/test_user')
            .send({secret_code:"rare_pepes"})
            .end(function(err, res) {
                if(err) {
                    console.log(err);
                } else {
                    username = res.body.user.username;
                    email = res.body.user.email;
                    password = res.body.user.password;
                    user_id = res.body.user.user_id;
                    auth_token = res.body.user.auth_token;
                }
                done();
            });
    });

    /* User Creation Test, test flag is set to true in order to post to the sample DB */
    it("should create a new user", function(done) {
        server
            .post("/users/register")
            .send({username: "new_user", password: "password", email: "user@user.com", test:"on"})
            .expect(200)
            .end(function(err, res) {
                should.equal(res.status, 200);
                should.exist(res.body.user.user_id);
                should.exist(res.body.user.username);
                should.exist(res.body.user.email);
                should.exist(res.body.user.timestamp);
                should.exist(res.body.user.auth_token);
                done();
            })
    });

    /* Should access a user's profile. */
    it("should access a user's profile", function(done) {
        server
            .get("/users/profile?user_id="  + user_id)
            .expect(200)
            .set('Authorization', 'bearer ' + auth_token)
            .end(function(err, res) {
                should.equal(res.status, 200);
                should.exist(res.body.user.user_id);
                should.exist(res.body.user.username);
                should.exist(res.body.user.email);
                should.equal(res.body.user.user_id, user_id);
                should.equal(res.body.user.username, username);
                should.equal(res.body.user.email, email);
            //    Should not be able to query the password!
                should.not.exist(res.body.user.password, password);
                done();
            })
    });

    /* Invalid token error. */
    it("should not be able to access the user's profile", function(done) {
        server
            .get("/users/profile?user_id=" + user_id)
            .expect(403)
            .set('Authorization', 'bearer rare_pepes')
            .end(function(err, res){
                done();
            })
    });

    /* Authenticate a user. */
    it("should be able to authenticate the user", function(done) {
        server
            .post("/users/login")
            .send({username: username, password: password})
            .expect(200)
            .end(function(err, res) {
                should.equal(res.status, 200);
                should.equal(res.body.token.user_id, user_id);
                should.equal(res.body.token.auth_token, auth_token);
                done();
            })
    });

    /* Invalid login. */
    it("should return a forbidden error", function(done) {
        server
            .post("/users/login")
            .send({username:"INVALID_USER_NAME!!", password:"INVALID_PASSWORD!!"})
            .expect(403)
            .end(function(err, res) {
                done();
            })
    });

    /* Should tokenize user. */
    it("should tokenize a user", function(done) {
        server
            .post("/users/tokenize")
            .send({user_id:user_id, reg_token:"123456"})
            .set("Authorization", 'bearer ' + auth_token)
            .end(function(err, res) {
                should.equal(res.status, 200);
                done();
            })
    })
})