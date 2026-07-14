import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout";

export default function Confirmacao() {
  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center py-20 px-4 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 text-center"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping opacity-75"></div>
            <CheckCircle2 className="w-12 h-12 text-green-600 relative z-10" />
          </div>
          
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Cotação Recebida!
          </h1>
          
          <p className="text-slate-600 mb-8 leading-relaxed">
            Seus dados foram enviados com sucesso para nossa equipe de análise. 
            Em breve, um de nossos especialistas entrará em contato com as melhores opções para proteger o seu negócio.
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-sm text-slate-500 border border-slate-100">
            Você receberá um e-mail de confirmação em instantes. Caso não encontre, verifique sua caixa de spam.
          </div>
          
          <Link href="/" className="btn-primary w-full shadow-md">
            Voltar para o Início
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}
