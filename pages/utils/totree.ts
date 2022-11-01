const ListToTree = (list:any) =>{

    let newObj = list;
    newObj && newObj.map((itm:any, ind:any)=>{
        // const {title, ...otherProps} = list;
        // newObj = {label: title, ...otherProps};
        itm.label = itm.title
        itm.value = itm.id
        //delete itm.title
    })
    //console.log(newObj);  //Getting value of json with label & value

    // const cleanObject = (object) => {
    //     if (object !== null) {
    //         switch (typeof object) {
    //             case 'string' :
    //                 const regex = new RegExp('"title":','di');
    //                 const reg2 = "/\dA/i"
    //                 object = object.replace(reg2, '"label":');
    //                 break;
    //             case 'object':
    //                 if (object instanceof Array) {
    //                     const length = object.length;
    //                     for (let i = 0; i < length; i++) {
    //                         object[i] = cleanObject(object[i]);
    //                     }
    //                 } else {
    //                     for (let i in object) {
    //                         object[i] = cleanObject(object[i]);
    //                     }
    //                 }
    //                 break;
    //         }
    //         console.log(object);
    //     }
    //     return object;
    // };


    var map = {}, node, roots = [], i;
    //console.log(list);

    // for (i = 0; i < list && list.length; i += 1) {
    //     map[list[i].id] = i; // initialize the map
    //     list[i].children = []; // initialize the children
    //   }

    //   for (i = 0; i < list && list.length; i += 1) {
    //     node = list[i];
    //     if (node.parentId !== null) {
    //       // if you have dangling branches check that map[node.parentId] exists
    //       list[map[node.parentId]].children.push(node);
    //     } else {
    //       roots.push(node);
    //     }
    //   }
      //console.log(roots)

    newObj && newObj.map((item:any, index:any)=>{
        map[newObj[index].id] = index; // initialize the map
        /**if(newObj[index].children){
            //console.log(newObj[index].children.length)
            if(newObj[index].children.length > 0 ){
                //console.log(newObj[index].children.length)
            }
        }*/
        newObj[index].children = []; // initialize the children
        // newObj[index].parent_id == null? "" : newObj[index].children = []; // initialize the children
        //console.log(newObj[index].parent_id);
        // newObj[index].parent_id == null? console.log(newObj[index].parent_id) : "" ;
        // if(newObj[index].parent_id == null){
        //      console.log(newObj[index].children.length)
        // }
    })
    // console.log(map);

    newObj && newObj.map((item:any, index:any)=>{
        node = newObj[index];
        if (node.parent_id !== null) {  //Has child
            // if you have dangling branches check that map[node.parentId] exists
            // if(node.children){
                //console.log(item.children.length);
            // }
            newObj[map[node.parent_id]].children.push(node);
            // node.children && node.children.length > 0? newObj[map[node.parent_id]].children.push(node) : "";
          } else {
            roots.push(node);
        }
    })
    // roots = roots.replace(/"title":/g,'"label":')
    // roots = roots.replace(/"id":/g,'"value":')
    // roots.prototype.replaceAll('"title":','"label":')
    // roots.prototype.replaceAll('"id":','"value":')

    /**Clean Children Part Recurssion */

    // const { transform, isObject, isEmpty } = {};

    // const removeEmpty = (obj, key) =>
    // transform(obj, (r, v, k) => {
    //     if(k === key && isEmpty(v)) return;
    //     r[k] = isObject(v) ? removeEmpty(v, key) : v;
    // });

    // const result = removeEmpty(roots, 'children');


    // console.log(result);
    //  const res = Object.entries(roots).reduce((a,[k,v]) => (v == {} ? a : (a[k]=v, a)), {})
    //  const res = Object.entries(roots).reduce((a,[k,v]) => (v == {} ? a : (a[k]=v, a)), {})
    //  console.log(res);


    // const nodes = (parent_id: any = null) =>{
    //     roots.map((item:any, index:any) => {
    //         console.log(item.children.length);
    //          nodes()
    //     })
    // }
    // var filtered = roots.filter(function (el) {
    //     console.log(el);
    //     return el != "";
    //   });
    //   console.log(filtered);
    // function seek(arr, id) {
    //     return arr.reduce((a, c) => {
    //      if (a) return a;
    //      if (c.id === id) return c;
    //      if (c.children) return test7(c.children, id);
    //      if (!(c.id === id)) return a; 
    //    }, null)
    //  }
        //let TREE_DATA={items:[{id:"1",name:"alpha"},{id:"2",name:"bravo",children:[{id:"3",name:"charlie"},{id:"4",name:"delta"},{id:"5",name:"emmet",children:[{id:"6",name:"franklin"},{id:"7",name:"glove",children:[{id:"8",name:"eight"},{id:"9",name:"nine"}]},{id:"10"}]},{id:"11"},{id:"12"}]},{id:"13"},{id:"14"}]};
        // const findObj = (arr, idToFind) => {
        //     for (const item of arr) {
        //         if (item.id === idToFind) return item;
        //         if (item.children) {
        //         const recursiveResult = findObj(item.children, idToFind);
        //         if (recursiveResult) return recursiveResult;
        //         }
        //     }
        // };
        // function removeNull(array) {
        //     return array.filter(x => x.length > 0)
        // };
        // var result = roots.filter(function (e) {return e.children.length > 0 ;});
        //removeNull(result)
        // console.log(result);
        //console.log(roots);
        // console.log(findObj(roots, ""));
    // console.log(findObj(TREE_DATA.items, '11'));
    



    // function removeEmpty(obj, parent = null, finalResult = {}) {

    //     Object.keys(obj).forEach(function(key) {
    //       const objKey = obj[key];
    //       if (objKey.constructor === Array && objKey.length === 0) {
    //         return
    //       }
    //       if (typeof objKey === 'object') {
    //         return removeEmpty(objKey, key, finalResult);
    //       } else {
      
    //         if (parent) {
    //           if (!finalResult[parent]) {
    //             finalResult[parent] = {}
    //           }
      
    //           finalResult[parent][key] = objKey
      
    //         } else {
    //           finalResult[key] = objKey;
    //         }
    //       }
    //     });
    //     return finalResult;
    //   }

    //   const output = removeEmpty(roots);
    //   console.log(output);
    const res = roots
    // let modified = JSON.stringify(res).replace(/,\\n\s*\\"children\\":\s*\[\]/g,"")
    
    /**Triming with pattern solution self test: https://regex101.com/ */
    let modified = JSON.stringify(res).replace(/,s*"children":\s*\[\]/g,"")
    let result = JSON.parse(modified);
    // console.log(modified)
    // console.log(result)

    // return roots;
    return result;
    //frshObj(roots);
    // cleanObject(roots);
}
export {ListToTree}