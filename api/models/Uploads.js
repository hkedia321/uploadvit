/**
 * Uploads.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema : true,
  attributes: {
    owner_regno:{
      type:'string'
    },
    name:{
      type:'string'
    },
    subject:{
      type:'string'
    },
    notes:{
      type:'string'
    },
    public:{
      type:'boolean'
    },
    fileurl:{
      type:'string'
    },
    filename:{
      type:'string'
    }

  }
};

