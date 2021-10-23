import compileTextNode from "./compileTextNode.js"
import compileAttribute from "./compileAttribute.js"

export default function compileNode(nodes, vm) {
  for (const node of nodes) {
    if (node.nodeType === 1) {
      // 元素节点
      // 编译节点上的各个属性，如：v-bind、v-model、@click='xxx'
      compileAttribute(node, vm)

      compileNode(Array.from(node.childNodes), vm)
    } else if (node.nodeType === 3 && node.textContent.match(/{{(.*)}}/)) {
      // 文本节点，如：<span>{{ key }}</span>
      compileTextNode(node, vm)
    }
  }
}
