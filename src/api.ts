import Papa from 'papaparse'

type Link = {
  label: string
  url: string
}
type User = {
  slug: string
  url: string
}

const api = {
  user: {
    list: async () => {
      const res = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vTjUZebFwj89SiMeHNSCBCXOKci1bGNtL3VfQND2DeaB9vM0dCJr0rrVSiNMqStHAZJBifJpuVHXsTC/pub?gid=1964748470&output=csv',
        {
          cache: 'no-store',
        }
      )
      const data = await res.text()
      const dataParsed = await new Promise<User[]>(
        (resolve, reject) => {
          Papa.parse<User>(data, {
            header: true,
            complete: (result) => resolve(result.data),
            error: reject,
          })
        }
      )

      return dataParsed
    },
  },
  links: {
    fetch: async (url: string) => {
      const res = await fetch(url, {
        cache: 'no-store',
      })
      const data = await res.text()
      const dataParsed = await new Promise<Link[]>(
        (resolve, reject) => {
          Papa.parse<Link>(data, {
            header: true,
            complete: (result) => resolve(result.data),
            error: reject,
          })
        }
      )

      return dataParsed
    },
  },
}

export default api
