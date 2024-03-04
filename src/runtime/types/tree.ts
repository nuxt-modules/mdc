export type MDCText = {
  type: 'text'
  value: string
}

export type MDCComment = {
  type: 'comment'
  value: string
}

export type MDCElement = {
  type: 'element'
  tag: string
  props: Record<string, any> | undefined
  children: Array<MDCElement | MDCText | MDCComment>
}

export type MDCNode = MDCElement | MDCText | MDCComment

export type MDCRoot = {
  type: 'root'
  children: Array<MDCNode>
}

export interface MDCData extends Record<string, any> {
  title: string,
  description: string,
}
