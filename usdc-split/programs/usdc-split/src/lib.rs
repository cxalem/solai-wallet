use anchor_lang::prelude::*;
declare_id!("7JP1EJH9kP1MQhnCJZztpikJaQpJB5g5bNr1z1fQcQaP");

#[program]
pub mod usdc_split {
    use super::*;

    pub fn split_usdc(
        _ctx: Context<SplitUsdc>,
        total_amount: u64,
        recipients: Vec<Pubkey>,
        percentages: Vec<u8>,
    ) -> Result<()> {
        // Input validation
        if recipients.len() != percentages.len() || recipients.is_empty() {
            return err!(SplitError::RecipientCountMismatch);
        }

        // Verify percentages sum to 100
        let sum: u16 = percentages.iter().map(|&p| p as u16).sum();
        if sum != 100 {
            return err!(SplitError::InvalidPercentageTotal);
        }

        // Calculate split amounts
        let mut amounts = vec![];
        let mut distributed: u128 = 0;

        for &pct in &percentages {
            let share = (total_amount as u128 * pct as u128) / 100;
            amounts.push(share as u64);
            distributed += share;
        }

        // Handle any rounding remainder by adding to the last recipient
        if distributed < total_amount as u128 {
            let remainder = (total_amount as u128 - distributed) as u64;
            if let Some(last) = amounts.last_mut() {
                *last += remainder;
            }
        }

        // We're not actually performing transfers in this simplified version
        // Instead, we'll just emit the event with split details

        // Emit event with the split details
        emit!(UsdcSplit {
            total_amount,
            recipients,
            amounts,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SplitUsdc<'info> {
    pub authority: Signer<'info>,
}
#[event]
pub struct UsdcSplit {
    pub total_amount: u64,
    pub recipients: Vec<Pubkey>,
    pub amounts: Vec<u64>,
}

#[error_code]
pub enum SplitError {
    #[msg("Recipient and percentage counts must match and not be empty.")]
    RecipientCountMismatch,
    #[msg("Percentage values must sum to 100.")]
    InvalidPercentageTotal,
}
