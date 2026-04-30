export default async function EventDetail({params}:{params:Promise<{id:string}>}){const {id}=await params; return <div>Event {id}</div>}
