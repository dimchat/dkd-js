'use strict';

//-------- namespaces --------
if (typeof dkd.protocol !== 'object') {
    dkd.protocol = {};
}
// if (typeof dkd.dkd !== 'object') {
//     dkd.dkd = {};
// }
if (typeof dkd.plugins !== 'object') {
    dkd.plugins = {};
}

//-------- requires --------
var Interface = mk.type.Interface;
var Mapper    = mk.type.Mapper;
