// 返回react节点
// 传入一个组件，自带props
const PageShell = Page => {
  return props => (
    <Page {...props} />
  );
};
export default PageShell;