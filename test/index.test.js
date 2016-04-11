'use strict'

var Code = require('code')
var Lab = require('lab')
var _ = require('lodash')


var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

var realModule =
{data: {
  'name': 'lodash',
  'url': 'https:\/\/travis-ci.org\/lodash\/lodash',
  'id': 48500,
  'group': 'stable',
  'active': true,
  'build_state': 'passed',
  'last_built': '2016-04-06T06:50:17Z',
  'id$': 'lodash'
}}

var Seneca = require('seneca')
var Info = require('../')

function createInstance () {
  return Seneca({log: 'silent'})
    .use('entity')
    .use(Info)
    .add({role: 'info', info: 'updated'}, function (args, done) {
      done()
    })
    .add({role: 'info', req: 'part'}, function (args, done) {
      done()
    })
    .act({role: 'info', res: 'part', part: 'travis', name: 'lodash'}, realModule)
}

/* suite('nodezoo-info suite tests ', function () {
  before({}, function (done) {
    si.ready(function (err) {
      if (err) {
        return process.exit(!console.error(err))
      }
      si.add({role: 'info', info: 'updated'}, function (args, done) {
        done()
      })
      si.add({role: 'info', req: 'part'}, function (args, done) {
        done()
      })
      si.act({role: 'info', res: 'part', part: 'travis', name: 'lodash'}, realModule)

      done()
    })
  })
})*/

describe('Get call', () => {
  it('can Find Module', function (done) {
    var seneca = createInstance()
    seneca.act(_.extend({role: 'info', cmd: 'get', name: 'lodash'}), function (err, data) {
      expect(err).to.not.exist()
      expect(data).to.not.be.empty()
      done(err)
    })
  })
  it('cannot Find Module', function (done) {
    var seneca = createInstance()
    seneca.act(_.extend({role: 'info', cmd: 'get', name: 'fakeModuleName'}), function (err, data) {
      expect(err).to.not.exist()
      expect(data).to.be.empty()
      done(err)
    })
  })
})
