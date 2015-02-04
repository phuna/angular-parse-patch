!function(window){function generateProps(instance,fields){var props={};return angular.forEach(fields,function(name){props[name]={get:function(){return instance.get(name)},set:function(value){instance.set(name,value)}}}),props}function enablePropAccess(instance,fields){"undefined"!=typeof Object.defineProperties?Object.defineProperties(instance,generateProps(instance,fields)):angular.forEach(fields,function(name){instance.__defineGetter__(name,function(){return instance.get(name)}),instance.__defineSetter__(name,function(value){return instance.set(name,value)})})}var angular=window.angular,module=angular.module("mcwebb.parse-patch",[]),methodsToUpdate={Object:{instance:["destroy","fetch","save"],"class":["destroyAll","fetchAll","saveAll"]},Collection:{instance:["fetch"],"class":[]},Query:{instance:["count","each","first","get"],"class":[]},Cloud:{instance:[],"class":["httpRequest","run"]},User:{instance:["logIn","signUp"],"class":["become","logIn","requestPasswordReset","signUp"]},FacebookUtils:{instance:[],"class":["logIn","link","unlink"]},File:{instance:["save"],"class":[]},Promise:{instance:[],"class":["send"]}};module.provider("ngParse",function(){var credentials={appId:"",jsKey:""};this.initialize=function(appId,jsKey){credentials.appId=appId,credentials.jsKey=jsKey},this.$get=["$window","$rootScope","$q",function($window,$rootScope,$q){if(angular.isUndefined($window.Parse))throw new Error("Parse SDK not available");var ngParse=$window.Parse;ngParse.initialize(credentials.appId,credentials.jsKey);for(var k in methodsToUpdate){var currentClass=k,currentObject=methodsToUpdate[k];currentObject.instance.forEach(function(method){var origMethod=ngParse[currentClass].prototype[method];ngParse[currentClass].prototype[method]=function(){var parsePromise=origMethod.apply(this,arguments),defer=$q.defer();return parsePromise.then(function(data){defer.resolve(data)},function(err){defer.reject(err)}),defer.promise}}),currentObject["class"].forEach(function(method){var origMethod=ngParse[currentClass][method];ngParse[currentClass][method]=function(){var parsePromise=origMethod.apply(this,arguments),defer=$q.defer();return parsePromise.then(function(data){defer.resolve(data)},function(err){defer.reject(err)}),defer.promise}})}return ngParse.Object.prototype.initialize=function(){"object"==typeof this.fields&&enablePropAccess(this,this.fields)},ngParse}]})}(this);