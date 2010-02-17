require 'classifier'

# There's a bug in Classifier::LSI where it doesn't call the right Matrix class
# when the GSL library is loaded. This monkey-patch fixes that.
# http://rubyforge.org/tracker/index.php?func=detail&aid=17839&group_id=655&atid=2587
module Classifier
  class LSI
    private

    def build_reduced_matrix( matrix, cutoff=0.75 )
      # TODO: Check that M>=N on these dimensions! Transpose helps assure this
      u, v, s = matrix.SV_decomp

      # TODO: Better than 75% term, please. :\
      s_cutoff = s.sort.reverse[(s.size * cutoff).round - 1]
      s.size.times do |ord|
        s[ord] = 0.0 if s[ord] < s_cutoff
      end
      # Reconstruct the term document matrix, only with reduced rank
      if $GSL
        u * GSL::Matrix.diag( s ) * v.trans
      else
        u * Matrix.diag( s ) * v.trans
      end
    end
  end
end
