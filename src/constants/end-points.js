export default EndPoints = {
  login: '/login',
  singup: '/signup',
  api: '/api/v1',
  createRequirement: '/requirements',
  getRequirements: '/requirements',
  getRequirement: '/requirements/:requirement_id',
  createComment: '/comments',
  getCommentsByRequirements: '/comments/requirement/:requirement_id',
  voting: 'votes/requirement/:requirement_id'
}
