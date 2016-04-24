/**
 * Created by david_000 on 4/22/2016.
 */
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:8900/api/v1");


/** Create new questions. **/
describe("Question creation tests", function() {

    // Save the question_id in order to delete the question later.
    var question_id = '';

    // Create a new question
    it("Should create a new question", function(done) {
        server
            .post("/question/single/create")
            .send({text:"test question", choices: ["test answer 1", "test answer 2", "test answer 3"], answer:"test answer 1", user_id:"123456", tag:"qpool_1"})
            .expect(200)
            .end(function(err, res) {
                should.equal(res.status, 200);
                should.exist(res.body.question.question_id);
                should.exist(res.body.question.text);
                should.exist(res.body.question.choices);
                should.exist(res.body.question.answer);
                should.exist(res.body.question.tag);
                question_id = res.body.question_id;
                done();
            })
    });

    // Create an invalid question
    it("Should return an error because there are no params", function(done) {
        server
            .post("/question/single/create")
            .expect(400)
            .end(function(err, res) {
                done();
            })
    })

    // Clean up after the tests
    after("Should delete the new user", function(done) {
        server
            .post("/question/delete")
            .send({question_id:question_id})
            .expect(200)
            .end(function(err, res) {
                should.equal(res.status, 200);
                should.equal(res.body.question.question_id, question_id);
                done();
            });
    });
});

/** Query Questions **/

describe("Question query tests", function(){

    var question_id = '';
    var text = '';
    var tag = '';
    var answer = '';
    var choices = '';

    before(function(done) {
        server
            .post('/question/single/test_question')
            .send({secret_code: "rare_pepes"})
            .end(function(err, res) {
                if(err) {
                    console.log(err);
                } else {
                    question_id = res.body.question.question_id;
                    text = res.body.question.text;
                    answer = res.body.question.answer;
                    choices = res.body.question.choices;
                    tag = res.body.question.tag;
                }
                done();
            });
    });

    it("should return a single question based on question id", function(done) {
        server
            .get("/question/single/index?question_id=" + question_id)
            .expect(200)
            .end(function(err, res) {
                should.equal(res.status, 200);
                should.exist(res.body.question.question_id);
                should.exist(res.body.question.text);
                should.exist(res.body.question.choices);
                should.exist(res.body.question.answer);
                should.exist(res.body.question.tag);
                should.exist(res.body.question.user_id);
                should.equal(res.body.question.text, text);
                should.deepEqual(res.body.question.choices, choices);
                should.equal(res.body.question.answer, answer);
                should.equal(res.body.question.tag, tag);
                should.equal(res.body.question.user_id, "123456");
                res.body.question.choices.should.have.length(3);
                done();
            })
    });

    // Query based on user_id
    it("Should query all the questions based on user_id", function(done) {
        server
            .get("/questions/all/user_index?user_id=123456")
            .expect(200)
            .end(function(err, res) {
                res.body.questions.should.have.length(1);
                should.exist(res.body.questions.question_id);
                done();
            });
    });

    // Query based on tags
    it("Should query all the questions based on the tag", function(done) {
        server
            .get("/questions/all/qpool_index?tag=qpool_1")
            .expect(200)
            .end(function(err, res) {
                res.body.quetions.should.have.length(1);
                should.exist(res.body.questions.question_id);
                done();
            });
    });

    // Delete the question afterwards
    after(function(done) {
        server
            .post("/question/delete")
            .send({question_id:question_id})
            .expect(200)
            .end(function(err, res) {
                should.equal(res.status, 200);
                should.equal(res.body.question.question_id, question_id);
                done();
            })
    })

});