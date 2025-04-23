import { caller } from "@/app/server/trpc/caller"
import LinkPill from "../LinkPill"

async function Categories() {
  const categories = await  caller.mealRouter.getCategories();
  return (
    <div className="flex w-auto flex-wrap justify-start gap-1 my-2">
      {categories.map(cat => (
        
        cat.strCategory !== null || undefined ?
        <LinkPill key={cat.strCategory} type="category" string={cat.strCategory} />
        :
        null
      ))}
    </div>
  )
}

export default Categories