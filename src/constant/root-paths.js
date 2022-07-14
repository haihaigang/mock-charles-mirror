const mockUrl = new URL('../../mock', import.meta.url)
const staticUrl = new URL('../../static', import.meta.url)

export const MOCK_ROOT_PATH = mockUrl.pathname
export const STATIC_ROOT_PATH = staticUrl.pathname