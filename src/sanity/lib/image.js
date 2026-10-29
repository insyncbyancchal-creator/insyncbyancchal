import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from './env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'demo-project-id',
  dataset: dataset || 'production',
})

export const urlForImage = (source) => {
  if (!source) return null;
  if (typeof source === 'string') return source;
  if (source.asset?._ref || source.asset?.url) {
    return imageBuilder?.image(source).auto('format').fit('max')
  }
  return null;
}
