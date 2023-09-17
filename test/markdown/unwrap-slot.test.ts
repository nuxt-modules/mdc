import { expect, it } from 'vitest'
import { flatUnwrap } from '../../src/runtime'

const vnodes = [{__v_isVNode:true,__v_skip:true,type:'p',props:{},key:null,ref:null,scopeId:null,slotScopeIds:null,children:[{__v_isVNode:true,__v_skip:true,props:null,key:null,ref:null,scopeId:null,slotScopeIds:null,children:'I am an alert!',component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:{},anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:8,patchFlag:0,dynamicProps:null,dynamicChildren:null,appContext:null}],component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:{},anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:17,patchFlag:0,dynamicProps:null,dynamicChildren:null,appContext:null}]

it('Unwrap tags', async () => {
  const withoutUnwrap = flatUnwrap(vnodes as any)

  expect((withoutUnwrap as any)[0]).toHaveProperty('type', 'p')
  expect((withoutUnwrap as any)[0].children[0]).toHaveProperty('children', 'I am an alert!')

  const withUnwrapString = flatUnwrap(vnodes as any, 'p')
  expect((withUnwrapString as any)[0]).not.toHaveProperty('type', 'p')
  expect((withUnwrapString as any)[0]).toHaveProperty('children', 'I am an alert!')

  const withUnwrapArray = flatUnwrap(vnodes as any, ['p'])
  expect((withUnwrapArray as any)[0]).not.toHaveProperty('type', 'p')
  expect((withUnwrapArray as any)[0]).toHaveProperty('children', 'I am an alert!')
})
