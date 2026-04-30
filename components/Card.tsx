export function Card({title,value}:{title:string;value:string|number}){
  return <div className='panel'><p className='text-sm text-slate-500'>{title}</p><p className='text-2xl font-bold mt-1'>{value}</p></div>;
}
