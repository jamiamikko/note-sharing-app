define({ "api": [  {    "type": "put",    "url": "/notes/",    "title": "Add new note",    "name": "add_new_note",    "group": "Notes",    "description": "<p>Endpoint for adding new note.</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-type",            "description": "<p>multipart/form-data</p>"          }        ]      }    },    "parameter": {      "examples": [        {          "title": "Request-Example",          "content": "\n------WebKitFormBoundaryYKP338JWcjjtPu3I\nContent-Disposition: form-data; name=\"title\"\n\nNew note\n------WebKitFormBoundaryYKP338JWcjjtPu3I\nContent-Disposition: form-data; name=\"creator\"\n\nmikkoj\n------WebKitFormBoundaryYKP338JWcjjtPu3I\nContent-Disposition: form-data; name=\"content\"\n\nNew note\n------WebKitFormBoundaryYKP338JWcjjtPu3I\nContent-Disposition: form-data; name=\"image\"; filename=\"yes.png\"\nContent-Type: image/png\n\n------WebKitFormBoundaryYKP338JWcjjtPu3I--",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "200 OK\n{\n  \"status\": \"OK\"\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "400 Bad Request\n{\n  \"error\": \"Error message\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/notes.js",    "groupTitle": "Notes"  },  {    "type": "delete",    "url": "/notes/:id",    "title": "Delete note with id",    "name": "delete_note_with_id",    "group": "Notes",    "description": "<p>Endpoint for deleting note with id.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>Notes unique id.</p>"          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-type",            "description": "<p>application/json</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "200 OK\n{\n  \"status\": \"OK\"\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "400 Bad Request\n{\n  \"error\": \"Error message\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/notes.js",    "groupTitle": "Notes"  },  {    "type": "get",    "url": "/notes/get/:id",    "title": "Get note with id",    "name": "get_note_by_id",    "group": "Notes",    "description": "<p>Endpoint for getting single note by id.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>Notes unique id.</p>"          }        ]      }    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-type",            "description": "<p>application/json</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "200 OK\n {\n   \"_id\":\"5c04147a9e28ac20656ed00b\",\n   \"time\":\"December 2nd 2018, 7:20\",\n   \"creator\":\"mikkoj\",\n   \"title\":\"Testing again\",\n   \"content\":\"Testing again\",\n   \"original\":\"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026.png\",\n   \"thumbnail\":\"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026_350x200.png\",\n   \"image\":\"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026_768x432.png\",\n   \"__v\":0\n }",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "400 Bad Request\n{\n  \"error\": \"Error message\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/notes.js",    "groupTitle": "Notes"  },  {    "type": "get",    "url": "/notes",    "title": "Get all notes",    "name": "get_notes",    "group": "Notes",    "description": "<p>Endpoint for getting all available notes.</p>",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-type",            "description": "<p>application/json</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "200 OK\n[\n  {\n    \"_id\":\"5c04147a9e28ac20656ed00b\",\n    \"time\":\"December 2nd 2018, 7:20\",\n    \"creator\":\"mikkoj\",\n    \"title\":\"Testing again\",\n    \"content\":\"Testing again\",\n    \"original\":\"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026.png\",\n    \"thumbnail\":\"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026_350x200.png\",\n    \"image\":\"uploads/f38a4b59-b06a-4f5e-9682-58cf2e19c026_768x432.png\",\n    \"__v\":0\n  }\n]",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "400 Bad Request\n{\n  \"error\": \"Error message\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/notes.js",    "groupTitle": "Notes"  },  {    "type": "post",    "url": "/notes/:id",    "title": "Modify note with id",    "name": "modify_note_by_id",    "group": "Notes",    "description": "<p>Endpoint for modifying single note by id.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>Notes unique id.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example",          "content": "\n------WebKitFormBoundarytiHk8bSFedx4rzAW\nContent-Disposition: form-data; name=\"title\"\n\nTesting editing\n------WebKitFormBoundarytiHk8bSFedx4rzAW\nContent-Disposition: form-data; name=\"creator\"\n\nmikkoj\n------WebKitFormBoundarytiHk8bSFedx4rzAW\nContent-Disposition: form-data; name=\"content\"\n\nTesting editing\n------WebKitFormBoundarytiHk8bSFedx4rzAW\nContent-Disposition: form-data; name=\"image\"; filename=\"Screen Shot 2018-08-10 at 13.02.29.png\"\nContent-Type: image/png\n\n------WebKitFormBoundarytiHk8bSFedx4rzAW--",          "type": "json"        }      ]    },    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Content-type",            "description": "<p>multipart/form-data</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "200 OK\n {\n   \"_id\":\"5c0566f29a220d0bddd60140\",\n   \"time\":\"December 3rd 2018, 7:25\",\n   \"creator\":\"mikkoj\",\n   \"title\":\"Testing editing\",\n   \"content\":\"Testing editing\",\n   \"original\":\"uploads/dd2de788-4f42-42e7-9a37-8442ae997cb9.png\",\n   \"thumbnail\":\"uploads/dd2de788-4f42-42e7-9a37-8442ae997cb9_350x200.png\",\n   \"image\":\"uploads/dd2de788-4f42-42e7-9a37-8442ae997cb9_768x432.png\",\n   \"__v\":0\n }",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "400 Bad Request\n{\n  \"error\": \"Error message\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/notes.js",    "groupTitle": "Notes"  }] });
