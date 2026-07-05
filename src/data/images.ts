/**
 * 📷 全站配图集中管理
 *
 * 替换图片的 3 种方法（任选其一）：
 *  1. 改这里的 URL（最快）：编辑下方任意行，保存即生效
 *  2. 替换文件：把新图放到 public/images/<slot>.jpg，URL 默认指向 /images/<slot>.jpg
 *  3. 切到外网图：把 URL 改成任意 https://... 即可（如 Unsplash 链接 / 自有 CDN）
 *
 * 命名规范：所有 key 形如 {角色}-{序号或位置}
 *  占位图来源：Unsplash（待替换成真实店照）
 */

const IMG = (slot: string) => `/images/${slot}.jpg`;

export const IMAGES = {
  /* ========== 品牌 ========== */
  logo:           '/logo-sm.png',              // public/logo-sm.png — 真实透明 logo（600px）

  /* ========== 建馆日志（17 张）==========
   * 默认占位图已在 public/images/ 下生成（同 studio.jpg）。
   * 替换方法：直接上传同名 jpg 到 public/images/，或修改下方 URL。
   */
  tx01Cover:      '/images/tx01.jpg',
  tx02Cover:      '/images/tx02.jpg',
  tx03Cover:      '/images/tx03.jpg',
  tx04Cover:      '/images/tx04.jpg',
  tx05Cover:      '/images/tx05.jpg',
  tx06Cover:      '/images/tx06.jpg',
  tx07Cover:      '/images/tx07.jpg',
  tx08Cover:      '/images/tx08.jpg',
  tx09Cover:      '/images/tx09.jpg',
  tx10Cover:      '/images/tx10.jpg',
  tx11Cover:      '/images/tx11.jpg',
  tx12Cover:      '/images/tx12.jpg',
  tx13Cover:      '/images/tx13.jpg',
  tx14Cover:      '/images/tx14.jpg',
  tx15Cover:      '/images/tx15.jpg',
  tx16Cover:      '/images/tx16.jpg',
  tx17Cover:      '/images/tx17.jpg',

  /* ========== 轻舟模式（PPT 提取）==========
   * 默认指向 public/ppt/ 下的真实店照
   */
  modelStudio:    '/ppt/studio.jpg',            // 关键词拆解段 — 教室实拍
  modelPractice:  '/ppt/practice.jpg',          // 课程规划段 — 私教实拍

  /* ========== 馆主 / 教练头像 ========== */
  ownerAvatar:    '/images/owner-avatar.jpg',
  coachAvatar:    '/images/coach-avatar.jpg',
  coach2Avatar:   '/images/coach2-avatar.jpg',
} as const;

/* 工具：批量取一组图片 */
export const txCovers = (ids: string[]) =>
  ids.map((id) => IMAGES[`tx${id.padStart(2, '0')}Cover` as keyof typeof IMAGES] ?? '');
