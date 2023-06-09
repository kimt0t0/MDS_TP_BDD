import chai from 'chai';
import chaiHttp from 'chai-http';
import { When, Then } from '@cucumber/cucumber';
import { StatusCodes } from 'http-status-codes';
import api from '../../index.js';

// IMPORTANT : For Cucumber working, always use function () {}
// (never () => {})

chai.use(chaiHttp);

Then('I should have response {string}', function(expectedStatusCode) {
  chai.expect(this.response).to.have.status(StatusCodes[expectedStatusCode]);
});

When('I get the {string}', async function(type) {
  const res = await chai.request(api).get(`/${type}`);
  this.response = res;
});

When('I list all {string}', async function (type) {
  const res = await chai.request(api).get(`/${type}`);
  this.response = res;
});

When('I create the following {string}', async function (type, dataTable) {
  const res = await chai.request(api).post(`/${type}s`).send(dataTable.hashes()[0]);
  this.response = res;
});

When('I update the following {string} with id {string} with following item', async function (type, recipeId, dataTable) {
  const res = await chai.request(api).patch(`/${type}s/${recipeId}`).send(dataTable.hashes()[0]);    
  this.response = res;
});

When('I delete the following {string} with id {string}', async function (type, recipeId) {
  const res = await chai.request(api).delete(`/${type}s/${recipeId}`);
  this.response = res;
});

Then(/following ["a-zA-Z]+ item:/, function(expectedData) {
  chai.expect(this.response.body).to.deep.equal({
    data: expectedData.hashes()[0]
  });
});

Then(/following ["a-zA-Z]+ data:/, function (expectedData) {
  chai.expect(this.response.body).to.deep.equal({
    data: expectedData.hashes()
  });
});

Then(/following new ["a-zA-Z]+ item:/, function(expectedData) {
  const {id, ...responseData} = this.response.body.data;
  chai.expect(responseData).to.deep.equal(expectedData.hashes()[0]);
  chai.expect(id).to.have.lengthOf(36);
});

Then(/following updated ["a-zA-Z]+ item:/, function(expectedData) {
  chai.expect(this.response.body.data).to.deep.equal(expectedData.hashes()[0]);
});
