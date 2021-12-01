import MockFile from "./MockFile.js";

// var mf = new MockFile("api-qa.shouwuapp.com", "/v1/login?a=t")
var mf = new MockFile("api-qa.shouwuapp.com", "/v1/login/abc/")
var mf = new MockFile("api-qa.shouwuapp.com", "/v1/login/abc/?who=123")
console.log(mf)