"use strict";var r=require("@chaperone/util");
/**
 * RepositoryException
 *
 * A generic repository exception.
 */class e extends r.BaseException{constructor(r="Repository Error"){super(r)}}
/**
 * Repostory
 *
 * Repository represents a generic repository.
 */exports.Repository=class{constructor(){}},exports.RepositoryException=e;
