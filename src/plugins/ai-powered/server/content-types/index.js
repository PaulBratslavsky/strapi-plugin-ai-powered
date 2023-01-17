'use strict';

const setting = require('./setting/schema.json');
const note = require('./note/schema.json');

module.exports ={
    setting: { schema: setting },
    note: { schema: note },
}