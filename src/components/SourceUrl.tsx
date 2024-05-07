interface Props {
  path: string
}
const SourceUrl: React.FC<Props> = ({ path }) => {
  return <a href={`https://github.com/snapauthapp/demo-web/blob/main/${path}`} target="_blank" rel="noopener noreferer">View component source</a>
}

export default SourceUrl
