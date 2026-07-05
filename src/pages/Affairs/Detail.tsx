import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Heart, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTransactionStore } from '../../stores/transactionStore';
import Button from '../../components/common/Button';

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const transactions = useTransactionStore((state) => state.transactions);
  const transaction = transactions.find((t) => t.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!transaction) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container-custom text-center py-16">
          <h1 className="text-2xl font-serif font-semibold text-accent mb-4">内容不存在</h1>
          <p className="text-muted mb-8">该事务记录可能被删除或转移</p>
          <Link to="/affairs">
            <Button variant="primary">返回列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [transaction.coverImage, ...transaction.images];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <Link
          to="/affairs"
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回列表
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {transaction.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-accent mb-6">
              {transaction.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {transaction.createdAt}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {transaction.author.name}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {transaction.viewCount} 次浏览
              </span>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 transition-colors ${
                  isLiked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                {transaction.likeCount + (isLiked ? 1 : 0)} 点赞
              </button>
            </div>
          </div>

          <div className="relative mb-8 rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={allImages[currentImageIndex]}
              alt={`图片 ${currentImageIndex + 1}`}
              className="w-full aspect-[16/9] object-cover"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-accent" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-accent" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl shadow-card p-8">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {transaction.content}
              </p>
            </div>
          </div>

          {allImages.length > 1 && (
            <div className="mt-8">
              <h3 className="text-lg font-serif font-semibold text-accent mb-4">图集</h3>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-secondary'
                    }`}
                  >
                    <img src={image} alt={`缩略图 ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
